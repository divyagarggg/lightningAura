/*
* Name: DupCheck
* Created On: 20 May 2021
* Author: DIVYA GARG (divya.garg2@dxc.com )
* Description: Dup Check to read uploaded csv files and convert it to the json string
*/
import { LightningElement} from 'lwc';
import checkDuplicates from '@salesforce/apex/DupCheckController.checkDuplicates';
export default class DupCheck extends LightningElement {
   
    value = '';
    acceptedFormat=['.csv'];

    get options() {
        return [
            { label: 'Sales', value: 'Sales' },
            { label: 'Non Sales', value: 'Non Sales' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    openfileUpload(event){
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = () => {
            var base64 = reader.result;
            var arr = []	; 
            arr =  base64.split('\n');;
            arr.pop();
        
            var jsonObj = [];
            var headers = arr[0].split(',');
            for(var i = 1; i < arr.length; i++) {
                var data = arr[i].split(',');
                var obj = {};
                for(var j = 0; j < data.length; j++) {
                    obj[headers[j].trim()] = data[j].trim();
                }
                jsonObj.push(obj);
            }
            var json = JSON.stringify(jsonObj);
            checkDuplicates({strfromlex: json})
                .then(result=>{
                    alert('result : '+JSON.stringify(result));
                })
                .catch(error=>{
                    alert('error : '+JSON.stringify(error));
                })
        }

    }
 
}