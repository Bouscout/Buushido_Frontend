import ReactLoading from 'react-loading'

function Loading() {
    return (
      <div>
        <h2>Loading in ReactJs - GeeksforGeeks</h2>
        <ReactLoading type="balls" color="#0000FF" 
          height={100} width={50} />
        <ReactLoading type="bars" color="#0000FF"
          height={100} width={50} />
        <ReactLoading type="bubbles" color="#0000FF"
          height={100} width={50} />
        <ReactLoading type="cubes" color="#0000FF"
          height={100} width={50} />
        <ReactLoading type="cylon" color="#0000FF" 
          height={100} width={50} />
        <ReactLoading type="spin" color="#0000FF"
          height={100} width={50} />
        <ReactLoading type="spokes" color="#0000FF"
          height={100} width={50} />
        <ReactLoading
          type="spinningBubbles"
          color="#0000FF"
          height={100}
          width={50}
        />
      </div>
    );
  }

export default function Loader_numero_uno(){
    return(
    <div style={{
      position : 'fixed',
      display : 'flex',
      justifyContent : 'center',
      textAlign : 'center',
      top : '50%',
      left : '50%',
      translate : '-50% -50%'
    }}> 
      <ReactLoading type="bars" color="#f8a100"
          height={100} width={100} />
    </div>
    )
}

export function Loader_dos(){
  return(
    <div style={{
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
    }}>
      <ReactLoading type="spin" color="#f8a100F"
          height={100} width={100} />
    </div>
  )
}