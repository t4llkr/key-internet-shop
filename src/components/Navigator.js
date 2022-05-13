import React from 'react';
import PropTypes from 'prop-types';

const ButtonArray = [
    { id:1, text:'ФИО', title:'Еремеев А.С.' },
    { id:2, text:'Группа', title: 'ИВТ-13-18' },
    { id:3, text:'ВУЗ', title: 'ЧГУ' }
]

//const url = 'localhost:3001/dashtitles';

class Navigator extends React.Component{
    sendValue = (newTitle) => {
        let {titleChangingClick} = this.props;
        titleChangingClick(newTitle);
    }

    render() {
        return (
            <div className='navigator'>
                {
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