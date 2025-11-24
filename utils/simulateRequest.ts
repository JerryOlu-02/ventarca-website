export async function simulateRequest(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));

  return { ok: true };
}
