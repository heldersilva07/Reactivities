import React, { FormEvent, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { ActivityFormValues } from '../../../../app/models/activity'
import { useContext } from 'react';
import ActivityStore from '../../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../../app/common/form/TextInput';
import TextAreaInput from '../../../../app/common/form/TextAreaInput';
import SelectInput from '../../../../app/common/form/SelectInput';
import { category } from '../../../../app/common/options/categoryOptions';
import DateInput from '../../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../../app/common/util/util';
import { v4 as uuid } from 'uuid';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Descriotion'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Date'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

interface DetailParams {
    id: string;
}


const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, loadActivity } = activityStore



    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity))).finally(() => setLoading(false));
        }
        // return () => {
        //     clearActivity()
        // }
    }, [loadActivity, match.params.id])

    // const handleSubmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     } else {
    //         editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        console.log(activity);
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //console.log(event.target.value);
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    //onChange={handleInputChange}
                                    rows={3}
                                    placeholder='Description'
                                    name='description'
                                    value={activity.description}
                                    component={TextAreaInput} />
                                <Field
                                    //onChange={handleInputChange}
                                    options={category}
                                    placeholder='Category'
                                    name='category'
                                    value={activity.category}
                                    component={SelectInput} />
                                <Form.Group widths='equal'>
                                    <Field
                                        //onChange={handleInputChange}
                                        //type='datetime-local'
                                        placeholder='Date'
                                        name='date'
                                        date={true}
                                        value={activity.date}
                                        component={DateInput}
                                    />
                                    <Field
                                        //onChange={handleInputChange}
                                        //type='datetime-local'
                                        placeholder='Date'
                                        name='time'
                                        time={true}
                                        value={activity.time}
                                        component={DateInput}
                                    />
                                </Form.Group>

                                <Field
                                    //onChange={handleInputChange}
                                    placeholder='City'
                                    name='city'
                                    value={activity.city}
                                    component={TextInput} />
                                <Field
                                    //onChange={handleInputChange}
                                    placeholder='Venue'
                                    name='venue'
                                    value={activity.venue}
                                    component={TextInput} />
                                <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' positive type='submit' content='Submit' />
                                <Button onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('activities')} disabled={loading} floated='right' type='button' content='Cancel' />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
