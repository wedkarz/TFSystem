package controllers

import java.util.UUID

import models.{User, Serializers, UsersManager}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
//import rapture.json._
//import jsonBackends.spray._

object Users extends Controller {
//  implicit val eventFormat = Serializers.UserFormat
  implicit val userFormat = Json.format[User]

  def allUsers = Action {
    val users = UsersManager.allUsers
    Ok(Json.obj("users" -> users).toString)
  }

  def deleteUser(email: String) = Action {
    val int = UsersManager.deleteUser(email)

    if(int > 0) {
      Ok(int.toString)
    } else {
      NotFound(email)
    }
  }

  def createUser = Action { implicit request =>
    var user = request.body.asJson.get.as[User]
    UsersManager.createUser(user)
    Ok(Json.toJson(user))
  }

  def updateUser(email: String) = Action { implicit request =>
    val user = request.body.asJson.get.as[User]
    val int = UsersManager.updateUser(user)

    if(int > 0) {
      Ok(int.toString)
    } else {
      NotFound(email)
    }
  }

  def findByEmail(email: String) = Action {
    Ok("")
  }
}
