package models

import play.api.libs.json._
import java.sql.Date

object Serializers {
	
	implicit object EventWithPresentationsFormat extends Format[(Event, List[Presentation])] {
    
		def writes(touple: (Event, List[Presentation])): JsValue = {
			JsObject(Seq(
					"event" -> JsObject(Seq(
							"id" -> JsString(touple._1.id.get.toString),							
							"date" -> JsString(touple._1.date.toString)
							)),
					"presentations" -> JsArray(touple._2.map(mapPresentation))

					))
		}
		
		// TO-DO
		def reads(json: JsValue): JsResult[(Event, List[Presentation])] = {
		  JsSuccess( (Event(Option(0L), new Date(2L)), List()))
		}
  
		def mapPresentation(p: Presentation) = JsObject(	
			 Seq(
					"id" -> JsString(p.id.get.toString),
					"name" -> JsString(p.name.get),
					"time" -> JsString(p.time.get),
					"eventId" -> JsString(p.eventId.get.toString)) 
			)
		}
	
	implicit object EventFormat extends Format[Event] {
    
		def writes(event: Event): JsValue = {
	      val eventSeq = Seq("id" -> JsString(event.id.get.toString),
	    		  			"date" -> JsString(event.date.toString))
	      JsObject(eventSeq)		  			
		}
		
		// TO-DO
	    def reads(json: JsValue): JsResult[Event] = {
	      JsSuccess(Event(Option(0L), new Date(1L)))
	    }
	}
	
	implicit object PresentationFormat extends Format[Presentation] {
    
	    def writes(presentation: Presentation): JsValue = {
	      val p = Seq("id" -> JsString(presentation.id.toString),
	    		  	"name" -> JsString(presentation.name.toString),
	    		  	"time" -> JsString(presentation.time.toString),
	    		  	"eventId" -> JsString(presentation.eventId.toString))
	      JsObject(p)	 	  	
	    }
	    
	    // TO-DO
	    def reads (json: JsValue): JsResult[Presentation] = {
	      JsSuccess(Presentation(Option(1L), Some(""), Some(""), Option(0L)))
	    }
	}
}