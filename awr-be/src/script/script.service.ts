/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ScriptService {

  // call OWM 
  private OWM=process.env.OWM_URL!;
  private OWM_KEY=process.env.OWM_KEY!;
  private HF_ENDPOINT=process.env.HF_ENDPOINT!;

  // note
  async getWeatherInfo(lat: number, lon:number) {
    const {data} = await axios.get(this.OWM, {
      params: {lat, lon, exclude:"hourly,current,minutely,alerts", appid: this.OWM_KEY, units:"metric"},
      timeout: 10_000,
    });

    const daily_data = data?.daily?.[0] ?? {};

    const owm_data = {
      description: daily_data?.weather?.[0]?.description ?? "unknown",
      temp: daily_data?.temp?.day ?? 0,
      humidity: daily_data?.humidity ?? 0,
      wind_speed: daily_data?.wind_speed ?? 0,
      clouds: daily_data?.clouds ?? 0,
      rain: daily_data?.rain ?? 0,
    };
    return owm_data;
  }
  // post to NLP and return script
  async send_HF(owm: any, gen_params = {temperature: 0.3, top_p: 0.85, max_new_tokens: 100, repetition_penalty: 1.1 }) {
    const payload = { owm, ...gen_params}; // same params as model
    const {data} = await axios.post(this.HF_ENDPOINT, payload, {timeout: 20_000});
    return data?.script ?? "";
  }

  async generateScript(lat: number, lon: number) {
    const owm_data = await this.getWeatherInfo(lat, lon);
    const script = await this.send_HF(owm_data);
    return { owm_data, script };
    console.log({owm_data, script})
  }
}
