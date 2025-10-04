import { Body, Controller, Get, Post } from "@nestjs/common";
import { ScriptService } from "./script.service";

@Controller()
export class ScriptController {
  constructor(private readonly scriptService: ScriptService ) {}

  @Post('generate')
  async generate(@Body() body: any) {
    return this.scriptService.generate(body)
  }

   @Get('check')
  check() {
    return { ok: true };
  }
}