package utils

import models.{UsersManager, User, UserRole, UserRoles}
import play.api.mvc.{Result, Request, Results, Action}
import rapture.json._
import jsonBackends.spray._

import scala.concurrent.Future

object AuthUtils {
  def roleToAuthorizationLevel(role: String) = {
    role match {
      case UserRoles.Participant.value => UserRoles.Participant.authorizationLevel
      case UserRoles.Presenter.value => UserRoles.Presenter.authorizationLevel
      case UserRoles.Organizer.value => UserRoles.Organizer.authorizationLevel
      case UserRoles.SuperOrganizer.value => UserRoles.SuperOrganizer.authorizationLevel
      case _ => UserRoles.all.authorizationLevel
    }
  }

  def isAuthorized(session: play.api.mvc.Session, requiredRole: UserRole): Boolean = {
    Console.print(session)

    session.get("user").map { user =>
      val userFromJSON = Json.parse(user).as[User]
      UsersManager.findByUUID(userFromJSON.token).map { userFromDB =>
        roleToAuthorizationLevel(userFromDB.role) >= requiredRole.authorizationLevel
      }.getOrElse(false)
    }.getOrElse(false)
  }
}

case class AuthorizedAction[A](minimalAuthorizedRole: UserRole, action: Action[A]) extends Action[A] with Results {
  import scala.concurrent.ExecutionContext.Implicits.global

  def apply(request: Request[A]): Future[Result] = {
    if(AuthUtils.isAuthorized(request.session, minimalAuthorizedRole)) {
      action(request)
    } else {
      Future(Unauthorized("User Not Authorized"))
    }
  }

  lazy val parser = action.parser
}
