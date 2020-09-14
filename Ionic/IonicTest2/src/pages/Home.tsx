import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, {Component} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

class Home extends Component{

  constructor(props:any){
    super(props)
  }

  state = {

    item_list : [],
    selected_item : '',

  }

  componentDidMount(){
    this.fetchItemList()
  }


  handleSelectedItem = (evt:any) =>{
    this.sendSelectedItem(evt.target.value)
  }

  sendSelectedItem = (item:string) => {
    fetch('http://127.0.0.1:8000/all_items/', {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
          'selected_item':item
        }),
        method: 'POST',
        
    })
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        this.setState({selected_item : data['selected_item']})
    })
    .catch(error => {                  
        // handle error
        console.log(error);
        
    });
  }

  fetchItemList = () => {

    fetch('http://127.0.0.1:8000/all_items/', {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => response.json()) 
    .then(data => {
        // console.log(data);
        this.setState({item_list : data['items']})
    })
    .catch(error => {                  
        // handle error
        console.log(error);
        
    });

  }



  render(){

    return(

        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
                <IonTitle>Home</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>

            <IonSelect interface="popover" className="select_item" onIonChange={this.handleSelectedItem}>
                {this.state.item_list.map((k,i)=>(
                    <IonSelectOption key={k} value={this.state.item_list[i]}>
                        {this.state.item_list[i]}
                    </IonSelectOption>
                ))}
            </IonSelect>

            <IonLabel className="ion-margin">
              This Response from Python Backend : &nbsp;
              {this.state.selected_item}
            </IonLabel>
          </IonContent>

        </IonPage>

    );

  }


}


export default Home;
