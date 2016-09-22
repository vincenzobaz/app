export type Environment = "production" | "development"

export const ENVIRONMENT  = {
  Production: 'production' as Environment,
  Development: 'development' as Environment
}

export class RunConfig {
  static env: string = process.env.NODE_ENV;

}
