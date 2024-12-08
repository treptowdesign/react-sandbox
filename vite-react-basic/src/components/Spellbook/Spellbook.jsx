import React, { useState } from 'react'
import './Spellbook.sass'
import spellData from './spellData'
import Navi from '@/components/Navi/Navi'

//////////////////////////////////////////////////////////
// Notes
//////////////////////////////////////////////////////////

// ToDo
// [ ] add filter options for class, spell level, school, etc.

//////////////////////////////////////////////////////////
// Main Component
//////////////////////////////////////////////////////////

function Spellbook() {
  const [spellList, setSpellList] = useState(spellData)
  const [filteredSpells, setFilteredSpells] = useState(spellData)
  const [activeSpell, setActiveSpell] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('ALL')
  const [selectedSchool, setSelectedSchool] = useState('ALL')

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase()
    setSearchText(query)
    applyFilters(query, selectedLevel, selectedSchool);
  }

  const handleLevelChange = (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    applyFilters(searchText, level, selectedSchool);
  };

  const handleSchoolChange = (event) => {
    const school = event.target.value;
    setSelectedSchool(school);
    applyFilters(searchText, selectedLevel, school);
  };

  const applyFilters = (search, level, school) => {
    const filtered = spellList.filter((spell) => {
      const matchesSearch = spell.name.toLowerCase().includes(search);
      const matchesLevel = level === 'ALL' || spell.level === level;
      const matchesSchool = school === 'ALL' || spell.school.toLowerCase() === school.toLowerCase();
      return matchesSearch && matchesLevel && matchesSchool;
    });
    setFilteredSpells(filtered);
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
                <div className="control-bar">
                    <div className="control">
                        <label htmlFor="search-input">Search Spells</label>
                        <input
                            id="search-input"
                            type="text"
                            name="search"
                            placeholder="Search Spells by Name"
                            value={searchText}
                            onChange={handleSearch} 
                        />
                    </div>
                    <div class="control">
                        <label htmlFor="level-filter">Level</label>
                        <select id="level-filter" name="level-filter" value={selectedLevel} onChange={handleLevelChange}>
                            <option value="ALL">All Levels</option>
                            <option value="cantrip">Cantrip</option>
                            {[...Array(9)].map((_, i) => (
                                <option key={i} value={String(i + 1)}>
                                    Level {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="control">
                        <label htmlFor="school-filter">School</label>
                        <select id="school-filter" name="school-filter" value={selectedSchool} onChange={handleSchoolChange}>
                            <option value="ALL">All Schools</option>
                            <option value="abjuration">Abjuration</option>
                            <option value="conjuration">Conjuration</option>
                            <option value="divination">Divination</option>
                            <option value="enchantment">Enchantment</option>
                            <option value="evocation">Evocation</option>
                            <option value="illusion">Illusion</option>
                            <option value="necromancy">Necromancy</option>
                            <option value="transmutation">Transmutation</option>
                        </select>
                    </div>
                </div>
                
                <ul>
                    {filteredSpells.map((spellItem, index) => (
                        <li key={index}>
                            <button onClick={() => handleClickSpell(spellItem.name)}>
                                {spellItem.name} ({spellItem.level})
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main>
                {activeSpell ? (
                    <div className="spell-details">
                        <h2>{activeSpell.name}</h2>
                        <ul>
                            <li><b>Type: </b> {activeSpell.type} </li>
                            <li><b>Class: </b> {activeSpell.classes.join(', ')} </li>
                            <li><b>Casting Time: </b> {activeSpell.casting_time} </li>
                            <li><b>Duration: </b> {activeSpell.duration} </li>
                            <li><b>Range: </b> {activeSpell.range} </li>
                            <li><b>Components: </b> {activeSpell.components.raw} </li>
                        </ul>
                        <p><b>Description:</b></p>
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