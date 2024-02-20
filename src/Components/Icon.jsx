
export function Icon(props){
 return <div onClick={props.onClick} className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2">
 <div className="flex flex-col justify-center h-full text-xl">
     {props.name}
 </div>
</div>
}