
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
  var newDevour = $(this).data("newdevour");

  var newDevouredState = {
    devoured: "true"
  };
  
  //send the put request using ajax.
  $.ajax("/api/burgers/" + id, {
    
    type: "PUT",
    data: newDevouredState

  }).then(
     function() {
      console.log("changed devour to" , newDevour);
      location.reload();
     }

  );

 });

  
  $(".delete-burger").on("click", function(event) {
     var id = $(this).data("id");

     //send Delete request
     $.ajax("/api/burgers/" + id, {
        
      type:  "DELETE",

     }).then(
       function() {
         console.log("deleted burger", id);

         // Reload the page
        location.reload();
       }

     );

  })

});












