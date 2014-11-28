package controllers

import models._
import play.api._
import play.api.data._
import play.api.mvc._
import models.Serializers._

object Application extends Controller {
 
  
  def index = Action {
    Ok(views.html.index())
  }

}