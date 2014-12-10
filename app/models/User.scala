package models

import java.sql.Date
import java.util.UUID
import org.joda.time.DateTime
import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._

case class User (token: String, email: String, role: String) {
}

class Users(tag: Tag) extends Table[User](tag, "USERS") {

  def email = column[String]("EMAIL", O.PrimaryKey, O.AutoInc)
  def token = column[String]("TOKEN")
  def role = column[String]("ROLE")

  def * =  (token, email, role) <> (User.tupled, User.unapply)

}
object UsersManager {
  def users = TableQuery[Users]

  def findByUUID(token: String): Option[User] = {
    DatabaseConfig.db.withSession { implicit session =>
      users.filter(_.token === token).firstOption
    }
  }
}
