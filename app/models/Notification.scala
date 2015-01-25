package models

import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._

case class Notification(id: Option[Long] = None, eventId: Long, role: String, sendTime: Int, template: String)

class Notifications(tag: Tag) extends Table[Notification](tag, "NOTIFICATIONS") {
  
  def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  def role = column[String]("ROLE")
  def sendTime = column[Int]("TIME")
  def template = column[String]("Template")
  def eventId = column[Long]("EVENT_ID")
  
  def event = foreignKey("EVENT_FK", eventId, EventsManager.events)(_.id)
  
  def * = (id.?, eventId, role, sendTime, template) <> (Notification.tupled, Notification.unapply _)
}

object NotificationManager {
  
  def notifications = TableQuery[Notifications]
  
    def getAll: List[Notification] = {
      DatabaseConfig.db.withSession { implicit session => 
	    notifications.list
      }
  	}
  
    def get(id: Long): Option[Notification] = {
      DatabaseConfig.db.withSession { implicit session => 
	    notifications.filter(_.id === id).firstOption
      }
  	}
    
    def insert(notification: Notification): Long = {
      DatabaseConfig.db.withSession { implicit session => 
	    notifications += notification
      }
  	}
        
   	def update(notification: Notification) = {
      DatabaseConfig.db.withSession { implicit session => 
	    notifications.filter(_.id === notification.id).update(notification)
      }
  	}
        
    def delete(id: Long)  = {
      DatabaseConfig.db.withSession { implicit session => 
	    notifications.filter(_.id === id).delete
      }
  	}
  
}