package models

import java.sql.Date
import java.util.UUID
import org.joda.time.DateTime
import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._

case class User (email: String, token: String, role: String) {
}

class Users(tag: Tag) extends Table[User](tag, "USERS") {

  def email = column[String]("EMAIL", O.PrimaryKey)
  def token = column[String]("TOKEN")
  def role = column[String]("ROLE")

  def * =  (email, token, role) <> (User.tupled, User.unapply)

}
object UsersManager {
  def users = TableQuery[Users]

  def findByUUID(token: String): Option[User] = {
    DatabaseConfig.db.withSession { implicit session =>
      users.filter(_.token === token).firstOption
    }
  }
}
