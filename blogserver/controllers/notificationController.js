import { Notification } from "../modals/notificationModal.js";

async function getNotifications(req, res) {
  try {
    const userId = req.user.id;
    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "name profileImg",
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notification);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteNotifications(req, res) {
  try {
    const userId = req.user.id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { getNotifications, deleteNotifications };
