import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

/*
This component handles the details view of a single selected Activity
*/

const ActivityDetails : React.FC = () => {
    const activityStore = useContext(ActivityStore)
    const {selectActivity, selectedActivity, openEditForm} = activityStore;

    return (
        <Card fluid>
            <Image src={`/Assets/Images/categoryImages/${selectedActivity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity!.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity!.description}
          </Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Button.Group widths={2}>
                   <Button onClick={() => openEditForm(selectedActivity!.id)} basic color='blue' content='Edit'/>
                   <Button onClick= { () => selectActivity(null)}  basic color='grey' content='Cancel'/>

               </Button.Group>
            </Card.Content>
        </Card>
    )
}
export default observer(ActivityDetails);