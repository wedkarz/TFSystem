package helpers

import java.util.UUID


class UUIDUtils(val self: String) extends AnyVal {
  def isValidUUID: Boolean = {
    if (self == null) false
    try {
      // we have to convert to object and back to string because the built in fromString does not have
      // good validation logic.
      val fromStringUUID = UUID.fromString(self);
      val toStringUUID = fromStringUUID.toString();
      return toStringUUID.equals(self);
    } catch {
      case iae: IllegalArgumentException => false // more specific cases first !
    }
    false
  }
}
