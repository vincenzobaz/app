
import {Lazy} from '../Lazy';

interface FBAppRequestOptions {
  message: string;
  to?: string;
  action_type?: 'send' | 'askfor' | 'turn';
  object_id?: string;
  max_recipients?: number;
  data?: string;
  title?: string;
}

interface FBAppRequestResponse {
  request: string;
  to: [string]
}

type FBUI  = (FBAppRequestParams) => Promise<FBAppRequestResponse>
const fbUi = new Lazy(() => <FBUI>Promise.promisify(FB.ui));

const override = {
  method: 'apprequests',
  // app_id: 'TODO',
  // redirect_uri: '/request/accept'
};

function overrideParams(options: FBAppRequestOptions): RequestsDialogParams {
  return <RequestsDialogParams>Object.assign(
    <any>{},
    <any>options,
    <any>override
  );
}

export function sendAppRequest(options: FBAppRequestOptions): Promise<FBAppRequestResponse> {
  return fbUi.value(overrideParams(options));
}

