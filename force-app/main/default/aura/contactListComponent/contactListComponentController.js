({
    doInit : function(component, event, helper) {

        //step 1 :- Here we are getting the object of Action class whenever we need to call the method
        //of server class 
        var action=component.get('c.getContactList');

        //Step 2:- Optional Parameters
        //action.setParams({});

        //step 4:- Process the Response coming from Apex class
        action.setCallback(this,function(response){
            var responseValue=response.getReturnValue();
            console.log(responseValue);
            component.set('v.contactList',responseValue);
        },'SUCCESS');      

        //Step 3:- Send the request to the server
        $A.enqueueAction(action); //Send the request to the server

    }
})
