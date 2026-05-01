import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import {
  recordLemonSqueezyWebhook,
  type LemonSqueezyWebhookPayload,
} from "@/lib/control-plane/lemonsqueezy";
import { requireServerEnv } from "@/lib/env";

export const runtime = "nodejs";

function verifySignature(rawBody: string, signatureHeader: string | null) {
  if (!signatureHeader) {
    return false;
  }

  const secret = requireServerEnv("LEMONSQUEEZY_WEBHOOK_SECRET");
  const received = Buffer.from(signatureHeader, "hex");
  const expected = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex",
  );

  return (
    received.length === expected.length &&
    crypto.timingSafeEqual(received, expected)
  );
}

function parseWebhookPayload(rawBody: string) {
  const payload = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;
  const eventName = payload.meta?.event_name;
  const externalId = payload.data?.id;
  const resourceType = payload.data?.type;

  if (!eventName || !externalId || !resourceType) {
    throw new Error("Invalid Lemon Squeezy webhook payload");
  }

  return {
    eventName,
    externalId,
    resourceType,
    payload,
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (!rawBody) {
    return NextResponse.json({ error: "Empty request body" }, { status: 400 });
  }

  if (!verifySignature(rawBody, request.headers.get("x-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const event = parseWebhookPayload(rawBody);
    await recordLemonSqueezyWebhook(event);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 },
    );
  }
}
