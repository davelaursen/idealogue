import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {UserStore} from '../../stores/userStore';
import ViewField from '../common/viewField.react';

class PersonViewPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {}
        };
    }

    componentWillMount() {
        UserStore.getUserById(this.props.params.personId)
            .done(user => {
                this.setState({ person: user });
            });
    }

    render() {
        return (
            <section>
                <h1 className="title">Person Details</h1>

                <ul className="actions">
                    <li><Link to="/people">back</Link></li>
                </ul>

                <div>
                    <ViewField label="" value={this.state.person.firstName + ' ' + this.state.person.lastName} className="bottom-border" />
                    <ViewField label="Username" value={this.state.person.username} />
                    <ViewField label="Email" value={this.state.person.email} />
                    <ViewField label="Joined" value={moment(this.state.person.createdDate).format('M/DD/YYYY')} />
                </div>
            </section>
        );
    }
}

export default PersonViewPage;
