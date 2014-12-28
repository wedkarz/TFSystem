package controllers
import models._
import play.api.libs.json.Json
import play.api.mvc._
import rapture.core.NotFound
import utils.{AuthorizedAction, AuthUtils}
import scala.concurrent.Future

object Users extends Controller {
  implicit val userFormat = Json.format[User]
  implicit val authUtils = AuthUtils

  def allUsers = AuthorizedAction(UserRoles.SuperOrganizer,
    Action { implicit request =>
      val users = UsersManager.allUsers
      Ok(Json.obj("users" -> users).toString)
  })

  def deleteUser(email: String) = AuthorizedAction(UserRoles.SuperOrganizer,
    Action {
      val int = UsersManager.deleteUser(email)

      if (int > 0) {
        Ok("Deleted users: " + int.toString)
      } else {
        NotFound("User " + email + " not found")
      }
  })

  def createUser = AuthorizedAction(UserRoles.SuperOrganizer,
    Action { implicit request =>
      var user = request.body.asJson.get.as[User]
      UsersManager.createUser(user)
      Ok(Json.toJson(user))
  })

  def updateUser(email: String) = AuthorizedAction(UserRoles.SuperOrganizer,
    Action { implicit request =>
      val user = request.body.asJson.get.as[User]
      val int = UsersManager.updateUser(user)

      if(int > 0) {
        Ok("Updated " + int.toString + "users")
      } else {
        NotFound("User " + email + " not found")
      }
    }
  )
}
