import * as React from 'react';
import axios from "axios";
import '../../style/recipes.sass'
import {useEffect, useRef, useState} from "react";
import RecipesHeader from "./RecipesHeader/RecipesHeader";
import searchItems, {titlePrettify} from '../../libs/filterItems';
import {initialRecipeItem} from "../../types/recipesTypes";


const Recipes: React.FC = () => {

    const [fetching, setFetching] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<any>([])
    const [currentRecipe, setCurrentRecipe] = useState<any>([])
    const [currentRecipeTitle, setCurrentRecipeTitle] = useState<string | undefined>()
    const [currentRecipeDetail, setCurrentRecipeDetail] = useState<any>([])
    const [currentItemRecipe, setCurrentItemRecipe] = useState<any>([])
    const [filteredItems, setFilteredItems] = useState<any>([])
    const [fetchedDetailedCraft, setFetchedDetailedCraft] = useState<any>()

    debugger


    let firstFetching = async() => {
        setFetching(true)
        const response = await axios.get('https://factorio.vasyapupkin8.repl.co/recipes')
        let array = Object.entries(response.data)
        setRecipes(array)
        setFetching(false)
    }

    let findImageLink = (itemName: string): string => {
        let result: string = ''
        recipes.forEach((item: any) => {
            if(item[0] == itemName){
                result = item[1].image
                return
            }
        })
        return result
    }

    let settingRecipe = (newRecipe: any): void => {
        setCurrentRecipe(newRecipe)
    }



    useEffect(() => {
        firstFetching()
    }, []) // Getting array of recipes from server at component render

    useEffect(() => {
        filterItems('')
    }, [recipes]) // Executing filterItems with empty string to throw whole recipe array to left sidebar after firstFetching

    useEffect(() => {
        setCurrentRecipeTitle(currentRecipe[0])
        setCurrentRecipeDetail(currentRecipe[1])
        setCurrentItemRecipe(currentRecipe[1]?.recipe)
    }, [currentRecipe])

    let recipeArray: any

    if(currentItemRecipe && Object.keys(currentItemRecipe).length > 0){
        recipeArray = Object.entries(currentItemRecipe)
    }


    let filterItems = (string: string): any => {
        const filteredItems = searchItems(recipes, string)
        setFilteredItems(filteredItems)
    }

    if(fetching) return (
        <>
            <h1 className="loading">Loading</h1>
        </>
    )


    if(recipes.length > 1 || !fetching) return (
        <>
        <div className="recipes">

            <section className="recipes__side recipes__left">
                <input type="text" placeholder="Search for item..." onChange={((e: any) => filterItems(e.target.value))}/>
                {filteredItems.map((el: any) => <div className="recipes__side_item" onClick={() => settingRecipe(el)}>
                    <img src={el[1].image} alt=""/>
                    <p>{titlePrettify(el[0])}</p>
                </div>)}
            </section>



            <section className="recipes__side recipes__right">
                {!currentRecipeDetail?.quantity || currentRecipeDetail?.elementary ? null : <RecipesHeader title={currentRecipeTitle} setFetchedDetailedCraft={setFetchedDetailedCraft}/> }

                <div className="recipes__right_item">
                    <div className="recipes__right_title">{currentRecipeTitle ? <img src={currentRecipeDetail?.image} alt=""/> : null}{titlePrettify(currentRecipeTitle)}</div>
                    <div className="recipes__right_infobox">
                        {/* long string cause of white-space: break-spaces */}
                        {!currentRecipeDetail?.quantity || currentRecipeDetail?.elementary ? null : <div>{currentRecipeDetail?.quantity} {currentRecipeDetail?.quantity > 1 ? 'items' : 'item'} for {currentRecipeDetail?.production_time}sec</div>}
                    </div>
                    {currentRecipeDetail?.elementary == true ? <div className="recipes__right_elementary">
                        Elementary item
                    </div> : null}
                    <div className="recipes__right_detailbox">
                        {recipeArray?.map((el: any) => <div className="recipes__right_detail">
                            <img src={findImageLink(el[0])} alt={el[0]}/>
                            <div>{titlePrettify(el[0])}: {el[1]}</div>
                        </div>)}
                    </div>

                </div>
            </section>
        </div>
    </>
    )

    return null
}

export default Recipes;