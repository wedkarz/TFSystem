package models

import scala.slick.driver.PostgresDriver.simple._
import scala.slick.lifted.{TableQuery, ProvenShape}
import play.api.libs.json._

case class Presentation (id: Option[Long] = None, name: Option[String], time: Option[String],
    						presenters: Option[String], description: Option[String], eventId: Option[Long] = None) {
}

class Presentations(tag: Tag) extends Table[Presentation](tag, "PRESENTATIONS") {
  
  def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  def name = column[String]("NAME")
  def time = column[String]("TIME")
  def presenters = column[String]("PRESENTERS")
  def description = column[String]("DESCRIPTION")
  def eventId = column[Long]("EVENT_ID")
  
  def * = (id.?, name.?, time.?, presenters.?, description.?, eventId.?) <> (Presentation.tupled, Presentation.unapply)
 
  def event = foreignKey("EVENT_FK", eventId, EventsManager.events)(_.id)
    
}

object PresentationsManager {
  val presentations = TableQuery[Presentations]
  
  // we have to consider three cases: entirely new presentation, which should be saved (has no id yet),
  // presentation which should be updated (has id already) and presentation to delete (also has id) 
  
  def updatePresentations(newPresentations: List[Presentation], eventId: Long) = {
    val oldPresentations = EventsManager.getEventWithPresentations(eventId).presentations.get
    val presentationsToDelete = filterPresentationsToDelete(newPresentations, oldPresentations)
    
    newPresentations.map(p => p.id match {
      case None => insertPresentation(p)
      case _ => updatePresentation(p)
    })
    
    presentationsToDelete.map(p => deletePresentation(p))
    
  }

def savePresentations(newPresentations : List[Presentation], eventId: Long) = {
    for (p <- newPresentations) {
      insertPresentation(p.copy(id = None, eventId = Some(eventId)))
    }
  }
  
  // finding those presentations which should be deleted; we map a list of new presentations to a list 
  // of ids and then we remove from old presentations List those which are contained in the new presentations list
  
  def filterPresentationsToDelete(newPresentations: List[Presentation], oldPresentations: List[Presentation]) = {
    oldPresentations.filter(p => !newPresentations.map(np => np.id).contains(p.id))
  }
  
  def insertPresentation(presentation: Presentation) = {
    DatabaseConfig.db.withSession { implicit session =>       
      (presentations returning presentations.map(_.id)) += presentation
    }
  }
  
  def updatePresentation(presentation: Presentation) = {
    DatabaseConfig.db.withSession{ implicit session =>
      presentations.filter(_.id === presentation.id).update(presentation)	
    }
  }
   
  def deletePresentation(presentation: Presentation) = {
    DatabaseConfig.db.withSession { implicit session =>
      	val query = presentations.filter(_.id === presentation.id.get)
    	query.delete
    }
  }
}