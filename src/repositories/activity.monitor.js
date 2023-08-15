import * as userRepo from "../repositories/auth.repository.js";

const ACTIVITY_TIMEOUT = 60000; // 1 minute

export async function startActivityMonitoring() {
  setInterval(async () => {
    try {
      const activeSessions = await userRepo.getAllActiveSessions();

      const currentTime = new Date();

      for (const session of activeSessions) {
        const createdAtTime = new Date(session.createdAt);
        const elapsedTime = currentTime - createdAtTime;

        if (elapsedTime > ACTIVITY_TIMEOUT) {
          await userRepo.deleteSessionByToken(session.token);
          console.log(`User ${session.userId} logged out due to inactivity.`);
        }
      }
    } catch (error) {
      console.error("Error during activity monitoring:", error);
    }
  }, ACTIVITY_TIMEOUT / 2);
}
