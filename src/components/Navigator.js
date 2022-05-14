import React from 'react';
import PropTypes from 'prop-types';

/*const ButtonArray = [
    { id:1, text:'ФИО', title:'Еремеев А.С.' },
    { id:2, text:'Группа', title: 'ИВТ-13-18' },
    { id:3, text:'ВУЗ', title: 'ЧГУ' }
]*/

const url = 'http://localhost:3001/dtitles';

class Navigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ButtonArray: []
        }
    }

    componentDidMount = async() => {
        let butarr = [];
        try {
            const result = await fetch(url);
            butarr = await result.json();
        }
        catch (err) {
            this.setState ({
                error: 'Ошибка'
            })
        }
        this.setState ({ButtonArray: butarr})
    }

    sendValue = (newTitle) => {
        let {titleChangingClick} = this.props;
        titleChangingClick(newTitle);
    }

    render() {
        let {ButtonArray} = this.state;
        return (
            <div className='navigator'> {
                ButtonArray.map(button => (
                    <div key={button.id}>
                        <button
                            className='nav-buttons'
                            onClick={()=>{this.sendValue(button.title)}}>
                                {button.text}
                        </button>
                    </div>
                ))
            }
            </div>
        );
    }
}

Navigator.propTypes = {
    titleChangingClick: PropTypes.func
}

export default Navigator;