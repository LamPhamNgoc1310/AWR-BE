import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ScriptService } from './script.service';

@Controller()
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  // Generate the script using query passed into function in script.service.ts
  @Get('generate')
  async generateNow(@Query('lat') lat: number, @Query('lon') lon: number) {
    const script = await this.scriptService.generateScript(lat, lon);
    return script;
  }

  @Get('weather-info')
  async getWeatherInfo(@Query('lat') lat: number, @Query('lon') lon: number) {
    const result = await this.scriptService.getWeatherInfo(lat, lon);
    return result;
  }

  @Get('check')
  check() {
    return { ok: true };
  }
}
