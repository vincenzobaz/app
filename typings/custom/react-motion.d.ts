declare module "react-motion" {
  export class Motion extends React.Component<any, any>{}
  export function spring(
    val: number,
    config?: SpringHelperConfig
  );
  export interface SpringHelperConfig {
    stiffness?: number;
    damping?: number;
    precision?: number;
  }
  
  export class TransitionMotion extends React.Component<any, any>{}
}
