import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type LemonSqueezyWebhookPayload = {
  meta?: {
    event_name?: string;
    webhook_id?: string;
    custom_data?: Record<string, unknown>;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: Record<string, unknown>;
  };
};

export type VerifiedLemonSqueezyEvent = {
  eventName: string;
  externalEventId: string;
  resourceId: string;
  resourceType: string;
  payload: LemonSqueezyWebhookPayload;
};

export async function recordLemonSqueezyWebhook(
  event: VerifiedLemonSqueezyEvent,
) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("webhook_events").upsert(
    {
      provider: "lemonsqueezy",
      event_name: event.eventName,
      external_event_id: event.externalEventId,
      resource_type: event.resourceType,
      resource_id: event.resourceId,
      payload: event.payload,
      processed_at: new Date().toISOString(),
    },
    {
      onConflict: "provider,external_event_id",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw error;
  }
}
