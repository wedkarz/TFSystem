package controllers

import java.util.UUID

import models.{UsersManager, User}
import play.api.data._
import play.api.data.Forms._
import play.api._
import play.api.mvc._
import helpers.UUIDUtils
import rapture.io._
import rapture.core._
import rapture.json._
import jsonBackends.spray._

object Authentication extends Controller {

//  def login(token: UUID) = Action { implicit request =>
//
//    if(token.toString == "D4BC5B90-78E7-11E4-82F8-0800200C9A66")

//      Ok(true)
//  }

  val loginForm = Form(
      "uuid" -> text
  )

  def login = Action { implicit request =>
    val uuid = loginForm.bindFromRequest.get
    val user:Option[User] = UsersManager.findByUUID(uuid)
    user match {
      case Some(user) => Ok(Json(user).toString).withSession("user" -> Json(user).toString)
      case None => Forbidden("Invalid UUID")
    }
  }

  def logout = Action { implicit request =>
    Ok("Bye").withNewSession
  }

  def restoreSession = Action { implicit request =>
    request.session.get("user").map { user =>
      Ok(user)
    }.getOrElse {
      Unauthorized("User session not found.")
    }
  }
}
