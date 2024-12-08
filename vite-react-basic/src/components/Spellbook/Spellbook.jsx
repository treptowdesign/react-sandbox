import React, { useState, useEffect, useRef } from 'react'
import './Spellbook.sass'
import spellData from './spellData'
import Navi from '@/components/Navi/Navi'

//////////////////////////////////////////////////////////
// Notes
//////////////////////////////////////////////////////////

// ToDo
// [x] add filter options for spell level & school
// [ ] add filter for class

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
  // sticky...
  const [isSticky, setIsSticky] = useState(false)
  const [stickyWidth, setStickyWidth] = useState('auto')
  const stickyRef = useRef(null)

  const schoolList = [
    'Abjuration', 'Conjuration', 'Divination', 'Enchantment',
    'Evocation', 'Illusion', 'Necromancy', 'Transmutation'
  ];

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


  useEffect(() => {
    let originalOffsetTop = null;
  
    const handleScroll = () => {
      const stickyElement = stickyRef.current
      if (!stickyElement) return
      if (originalOffsetTop === null) {
        // record the initial top position of the sticky element relative to the document
        originalOffsetTop = stickyElement.getBoundingClientRect().top + window.pageYOffset
      }
      const scrollTop = window.pageYOffset
      const parentWidth = stickyElement.offsetWidth
      // stick the element when scrolled past its original position
      if (scrollTop >= originalOffsetTop && !isSticky) {
        setStickyWidth(parentWidth)
        setIsSticky(true)
      }
      // unstick the element when scrolled above its original position
      else if (scrollTop < originalOffsetTop && isSticky) {
        setIsSticky(false)
        setStickyWidth('auto')
      }
    };
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky])
  

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
                    <div className="control">
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
                    <div className="control">
                        <label htmlFor="school-filter">School</label>
                        <select id="school-filter" name="school-filter" value={selectedSchool} onChange={handleSchoolChange}>
                            <option value="ALL">All Schools</option>
                            {schoolList.map((school, index) => (
                                <option key={index} value={school.toLowerCase()}>{school}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <ul>
                {filteredSpells.length > 0 ? (
                    filteredSpells.map((spell, index) => (
                        <li key={index}>
                        <button className="spell-btn" onClick={() => handleClickSpell(spell.name)}>
                            <span className={'marker ' + spell.school}>
                            {spell.level === 'cantrip' ? '0' : spell.level}
                            </span>
                            {spell.name}
                        </button>
                        </li>
                    ))
                    ) : (
                    <div className="no-spells-message">No spells match your criteria.</div>
                    )}
                </ul>
            </aside>
            <main>
            <div
                id="sticky-element"
                ref={stickyRef}
                className={`spell-details ${isSticky ? 'sticky' : ''}`}
                style={isSticky ? { width: stickyWidth } : {}}
            >
                {activeSpell ? (
                    <div className="spell-details-inner">
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
                </div>
            </main>
        </div>
    </>
  )
}

export default Spellbook