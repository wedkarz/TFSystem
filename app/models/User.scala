package models

import java.sql.Date
import java.util.UUID
import org.joda.time.DateTime
import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._

case class User (email: String, token: String = UUID.randomUUID.toString, role: String)

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

  def findByEmail(email: String): Option[User] = {
    DatabaseConfig.db.withSession { implicit session =>
      users.filter(_.email === email).firstOption
    }
  }

  def createUser(user: User) = {
    DatabaseConfig.db.withSession{ implicit session =>
      users += user
    }
  }

  def allUsers(): List[User] = {
    DatabaseConfig.db.withSession { implicit session =>
      users.list
    }
  }

  def updateUser(user: User): Int = {
    DatabaseConfig.db.withSession{ implicit session =>
      users.filter(_.email === user.email).update(user)
    }
  }

  def deleteUser(userEmail: String): Int = {
    DatabaseConfig.db.withSession{ implicit session =>
      users.filter(_.email === userEmail).delete
    }
  }

  def generateTokenForUser(user: User): String = {
    val token = UUID.randomUUID().toString
    val updatedUser = User(user.email, token, user.role)

    DatabaseConfig.db.withSession{ implicit session =>
      users.filter(_.email === user.email).update(updatedUser)
    }

    token
  }
}
