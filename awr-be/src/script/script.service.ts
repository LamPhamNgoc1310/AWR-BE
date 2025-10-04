// /* eslint-disable prettier/prettier */
// import { Injectable } from "@nestjs/common";
// import axios from "axios";

// @Injectable()
// export class ScriptService {
//     private endpoint = process.env.HF_ENDPOINT;
//     constructor() {
//         this.endpoint = process.env.HF_ENDPOINT;
//         console.log('[ScriptService] HF_ENDPOINT =', this.endpoint);
//     }
//     // generate posts to endpoint
//     async generate(payload: any) {
//     if(!this.endpoint) {
//         return  { error: 'Endpoint error'}
//     }
//     // post with axios
//     const {data} = await axios.post(this.endpoint, payload, {
//       headers: { 'Content-Type': 'application/json' },
//     });
    
//     // get result
//     return {script: data?.script};
//     }
// }

/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ScriptService {
  private endpoint: string | undefined;

  constructor() {
    this.endpoint = process.env.HF_ENDPOINT;
    console.log('[ScriptService] HF_ENDPOINT =', this.endpoint);
  }

  async generate(payload: any) {
    if (!this.endpoint) {
      return { error: 'Endpoint error' };
    }
    const { data } = await axios.post(this.endpoint, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return { script: data?.script };
  }
}
