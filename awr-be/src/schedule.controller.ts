import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import schedule from "node-schedule";
import { RealtimeGateway } from "./realtime.gateway";
import { ScriptService } from "./script/script.service";

@Controller()
export class ScheduleController {
  constructor(
    private readonly rt: RealtimeGateway,
    private readonly scriptService: ScriptService
  ) {}

  @Post("schedule")
  async scheduleCountdown(
    @Body() body: { delaySeconds: number; lat: number; lon: number; clientId: string }
  ) {
    const { delaySeconds, lat, lon, clientId } = body || {};
    if (!delaySeconds || !clientId)
      throw new BadRequestException("delaySeconds and clientId are required");

    // compute fire time
    const fireAt = new Date(Date.now() + delaySeconds * 1000);

    // one-shot schedule
    schedule.scheduleJob(fireAt, async () => {
      try {
        const result = await this.scriptService.generateScript(Number(lat), Number(lon));
        this.rt.sendScript(clientId, result); // push script JSON
      } catch {
        this.rt.sendScript(clientId, {script: "Failed to generate script."});
      }
    });

    return {
      ok: true,
      fireIn: `${delaySeconds} seconds`,
      scheduledFor: fireAt.toISOString(),
    };
  }
}
