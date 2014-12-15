package models

import org.junit.Test
import org.junit.Assert._

class PresentationManagerTest {

  val presentationOne = Presentation(Some(1L), Some("bbb"), Some("15-16"), Some("Presenter 1, Presenter 2"), Some(2L))
  val presentationTwo = Presentation(Some(2L), Some("ccc"), Some("15-16"), Some("Presenter 1, Presenter 3"), Some(2L))
  val presentationThree = Presentation(Some(3L), Some("ddd"), Some("16-17"), Some("Presenter 1, Presenter 2"), Some(2L))
  val presentationOneUpdated = Presentation(Some(1L), Some("aaa"), Some("15-16.30"), Some("Presenter 1"), Some(2L))
  
  val oldPresentations = List(presentationOne, presentationTwo) 
  val newPresentations = List(presentationOneUpdated, presentationThree)
  
  val expected = List(presentationTwo)
  
  
  @Test def filterPresentationsToDeleteTest() = {
    assertEquals(List(), PresentationsManager.filterPresentationsToDelete(List(), List()))
    
    assertEquals(List(), PresentationsManager.filterPresentationsToDelete(List(presentationOneUpdated), List(presentationOne)))
    
    assertEquals(expected, PresentationsManager.filterPresentationsToDelete(newPresentations, oldPresentations))
  }
}