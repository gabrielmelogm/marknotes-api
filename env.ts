import { ConfigModule } from '@nestjs/config'
import { z } from 'zod'

ConfigModule.forRoot()

const nodeEnv = z.enum(['development', 'production'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
	return (value: any) => {
		if (env === process.env.NODE_ENV && !value) {
			return false
		}

		return true
	}
}

const envSchema = z.object({
	NODE_ENV: nodeEnv.default('development'),
	TYPEORM_CONNECTION: z.enum(['postgres']),
	TYPEORM_HOST: z.string(),
	DATABASE_PORT: z.string(),
	DATABASE_NAME: z.string(),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)
