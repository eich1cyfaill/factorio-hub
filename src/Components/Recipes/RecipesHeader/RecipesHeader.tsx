import axios from 'axios';
import React, {useRef, useState} from 'react';
import { titlePrettify } from '../../../libs/filterItems';
import st from '../../../style/RecipeHeader.module.sass'

interface IMyProps {
    title: string | undefined
    setFetchedDetailedCraft: any
}


const RecipesHeader: React.FC<IMyProps> = (props: IMyProps) => {

    const speedRef = useRef<any>()
    const prodRef = useRef<any>()
    const [selectValue, setSelectValue] = useState<string | undefined>()


    let fetchDetailedRecipe = async() => {
        let speedQuery: number
        let prodQuery: number
        if(speedRef.current.value){
            speedQuery = speedRef.current?.value
        } else {
            speedQuery = 1
        }

        if(prodRef.current?.checked){
            prodQuery = 1
        } else {
            prodQuery = 0
        }


        const response = await axios.get('https://factorio.vasyapupkin8.repl.co/detailedCraft', {
            params: {
                item: props.title,
                speed: speedQuery,
                productivity: prodQuery,
                'assembling-machine': selectValue
            }
        })
        props.setFetchedDetailedCraft(response.data)
    }

    return (
        <div className={st.recipesHeader}>
            <div>Custom Settings for {titlePrettify(props.title)}</div>
            <div className={st.recipesHeader__speed}>
                <input ref={speedRef} type="text"/> <p>speed</p>
            </div>
            <div className={st.recipesHeader__select}>
                <select name="" id="" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                    <option value="assembling-machine-1">Assembling machine 1</option>
                    <option value="assembling-machine-2">Assembling machine 2</option>
                    <option value="assembling-machine-3">Assembling machine 3</option>
                </select>
            </div>
            <div className={st.recipesHeader__productivity}>
                <label htmlFor="Productivity">Productivity</label>
                <input type="checkbox" name="Productivity" ref={prodRef}/>
            </div>
            <div className={st.recipesHeader__button}>
                <button onClick={() => fetchDetailedRecipe()}>Request</button>
            </div>
        </div>
    );
};

export default RecipesHeader;