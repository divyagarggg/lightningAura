/*
* Name: DupCheckController
* Created On: 20 May 2021
* Author: DIVYA GARG (divya.garg2@dxc.com )
* Description: Dup Check controller to check uploaded file contains duplicate PSA Candidates
*/
public with sharing class DupCheckController {
    
    @AuraEnabled
    public static List<PSA_Candidate__c> checkDuplicates(String strfromlex)
    {
        List<String> fNamesList=new List<String>();
        List<String> lNamesList=new List<String>();
        List<fieldWrapper> datalist = (List<fieldWrapper>) JSON.deserialize(strfromlex, List<fieldWrapper>.class);
        for(fieldWrapper wrapper: datalist)
        {
            fNamesList.add(wrapper.FirstName);
            lNamesList.add(wrapper.LastName);
        }
        List<PSA_Candidate__c> candidatesList=[select First_Name__c,Last_Name__c from PSA_Candidate__c where First_Name__c in :fNamesList and Last_Name__c in :lNamesList];
        if(candidatesList.size()>0){
            return candidatesList;
        }
        else {
            return null;
        }
        
    }

    public class fieldWrapper {
        public String FirstName;
        public String LastName;
    } 
}
