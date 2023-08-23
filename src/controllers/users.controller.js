import * as userRepo from "../repositories/users.repository.js";

export async function searchByUsername(req, res) {
  const { userName } = req.params;
  const loggedInUserId = req.query.loggedInUserId;

  try {
    const users = await userRepo.getUserByName(userName);
    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with the specified letter." });
    }

    const usersWithFollowStatus = await Promise.all(
      users.map(async (user) => {
        const isFollowing = await userRepo.checkIfUserIsFollowing(
          user.userId,
          loggedInUserId
        );
        return { ...user, isFollowing };
      })
    );

    res.json({ users: usersWithFollowStatus });
  } catch (error) {
    console.error("Error during letter search:", error);
    res.status(500).send({ message: "Error during letter search:", error });
  }
}

export async function toggleFollow(req, res) {
  const { userIdToFollow, loggedInUserId } = req.body;

  try {
    const success = await userRepo.toggleFollowStatus(
      userIdToFollow,
      loggedInUserId
    );

    if (success) {
      res.json({ message: "Follow status toggled successfully." });
    } else {
      res.status(500).send({ message: "Failed to toggle follow status." });
    }
  } catch (error) {
    console.error("Error toggling follow status:", error);
    res.status(500).send({ message: "Error toggling follow status:", error });
  }
}

export async function checkFollow(req, res) {
  const { userId } = req.params;
  const loggedInUserId = req.query.loggedInUserId;

  const isFollowing = await userRepo.checkIfUserIsFollowing(
    userId,
    loggedInUserId
  );

  res.json(isFollowing);
}

export async function getFollowingIds(req, res) {
  const loggedInUserId = req.params.userId;

  try {
    const followingIds = await userRepo.getFollowingIds(loggedInUserId);
    res.json({ followingIds });
  } catch (error) {
    console.error("Error getting following IDs:", error);
    res.status(500).send({ message: "Error getting following IDs:", error });
  }
}
