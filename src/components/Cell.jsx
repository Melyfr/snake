import React from 'react'
import '../css/Cell.css';

export default function Cell(props) {
  return (
    <div className={`cell cell-${props.type}`}>
    </div>
  )
}
