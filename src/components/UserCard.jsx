import avatar from '../avatar.png'

export const UserCard = (state) => {
  //console.log(state.user)
  return (
    <div className='user-card'>
      <img src={avatar}></img>
      <div className='user-card-content'>
        <span className='user-card-name'>{state.user.name}</span>
        <span className='user-card-nickname'>({state.user.nickname})</span>
        <span className='user-card-online'>● online</span>
      </div>
    </div>
  )
};
