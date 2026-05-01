export type LemonSqueezyWebhookPayload = {
  meta?: {
    event_name?: string;
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
  externalId: string;
  resourceType: string;
  payload: LemonSqueezyWebhookPayload;
};

export async function recordLemonSqueezyWebhook(
  event: VerifiedLemonSqueezyEvent,
) {
  // Supabase schema lands in the next slice. This boundary prevents webhook
  // parsing from spreading into route handlers once persistence is added.
  void event;
}
