import React, { useState } from 'react'
import './Spellbook.sass'
import spellData from './spellData'
import Navi from '@/components/Navi/Navi'


function Spellbook() {
  const [spellList, setSpellList] = useState(spellData);
  const [filteredSpells, setFilteredSpells] = useState(spellData);
  const [activeSpell, setActiveSpell] = useState(null);
  const [searchText, setSearchText] = useState(''); 

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); 
    setSearchText(query);
    setFilteredSpells(
      spellList.filter((spell) => spell.name.toLowerCase().includes(query)) // filter spells by name
    );
  };

  const handleClickSpell = (name) => {
    setActiveSpell(spellList.find((s) => s.name === name))
  }

  return (
    <>
        <Navi />
        <header className="spellbook-header">
        <div>Spellbook: {spellList.length} records, Filtered: {filteredSpells.length} record(s)</div>
        </header>
        <div className="spellbook-body">
            <aside>
                <h2>Spell List</h2>
                <div className="control">
                    <input
                        type="text"
                        placeholder="Search Spells"
                        value={searchText}
                        onChange={handleSearch} 
                    />
                </div>
                <ul>
                    {filteredSpells.map((spellItem, index) => (
                        <li key={index}>
                            <button onClick={() => handleClickSpell(spellItem.name)}>
                                {spellItem.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main>
                {activeSpell ? (
                    <div>
                        <h2>{activeSpell.name}</h2>
                        <ul>
                            <li><b>Type: </b> {activeSpell.type} </li>
                            <li><b>Class: </b> {activeSpell.classes.join(', ')} </li>
                            <li><b>Casting Time: </b> {activeSpell.casting_time} </li>
                            <li><b>Duration: </b> {activeSpell.duration} </li>
                            <li><b>Range: </b> {activeSpell.range} </li>
                            <li><b>Components: </b> {activeSpell.components.raw} </li>
                        </ul>
                        <p>{activeSpell.description}</p>
                    </div>
                ) : (
                    <div>
                        <h2>Spell Information</h2>
                        <p>Select a Spell from the List</p>
                    </div>
                )}
            </main>
        </div>
    </>
  )
}

export default Spellbook