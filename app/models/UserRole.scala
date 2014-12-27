package models

class UserRole(val value: String, val authorizationLevel: Int)

case class All() extends UserRole("", 0)
case class Participant() extends UserRole("participant", 0)
case class Presenter() extends UserRole("presenter", 1)
case class Organizer() extends UserRole("organizer", 2)
case class SuperOrganizer() extends UserRole("superorganizer", 3)

object UserRoles {
  val all = new All()
  val Participant = new Participant()
  val Presenter = new Presenter()
  val Organizer = new Organizer()
  val SuperOrganizer = new SuperOrganizer()
}