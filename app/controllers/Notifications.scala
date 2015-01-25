package controllers

import models._
import play.api.libs.json.Json
import play.api.mvc._
import rapture.core.NotFound
import utils.{AuthorizedAction, AuthUtils}
import scala.concurrent.Future
import utils.AuthorizedAction
import utils.AuthorizedAction

object Notifications extends Controller {

  implicit val notificationFormat = Json.format[Notification]
  
  def getAll = AuthorizedAction(UserRoles.SuperOrganizer, 
      Action { implicit request =>
      	val notifications = NotificationManager.getAll
        Ok(Json.toJson(notifications))
  })
  
  def get(id: Long) = AuthorizedAction(UserRoles.SuperOrganizer, 
      Action { implicit request =>
        val notification = NotificationManager.get(id) 
      	Ok(Json.toJson(notification))
  })
  
  def create = AuthorizedAction(UserRoles.SuperOrganizer, 
      Action { implicit request =>
        val notification = request.body.asJson.get.as[Notification]
        NotificationManager.insert(notification)
      	Ok("Success")
  })
  
  def update(id: Long) = AuthorizedAction(UserRoles.SuperOrganizer, 
      Action { implicit request =>
      	val notification = request.body.asJson.get.as[Notification]
        NotificationManager.update(notification)
        Ok("Success")
  })
  
  def delete(id: Long) = AuthorizedAction(UserRoles.SuperOrganizer, 
      Action { implicit request =>
        NotificationManager.delete(id)
      	Ok("Success")
  })
   
}