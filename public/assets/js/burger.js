
$ (document).ready(function () {

   $(".create-form").on("submit", function(event){
     
     event.preventDefault();

     var newBurger = {
       burger_name: $("#burgerToDevour").val(),
       devoured:0

     };


    //  Send POST request using ajax- Burger to Devour- DEVOUR TIME.
      $.ajax("/api/burgers", {
        method: 'POST',
        data: newBurger 
        
      }).then( 
        function () {
      
          $("#burgerToDevour").val("");

        // Reload the page so the user can see the new quote
        console.log("Created a new burger");

        location.reload();
      }
      );
  });




 //click event for "Devoured Burger _EAT AGAIN button."

 $(".change-devour").on("click", function(event){

  var id = $(this).data("id");
  var devoured = $(this).data("devoured");

  var devouredState = {
    devoured: devoured,
  };
  
  //send the put request using ajax.
  $.ajax("/api/burgers/" + id, {
    
    type: "PUT",
    data: devouredState

  }).then(
     function() {
      console.log("changed devoured to" , dovoured);
      location.reload();
     }

  );

 });







});












