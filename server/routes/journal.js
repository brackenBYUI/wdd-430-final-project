let express = require('express')
let ObjectId = require('mongodb').ObjectId; 

const Journal = require('../models/journal')

let router = express.Router();

router.get('/', (req, res, next) => {
    Journal.find()
    .then((entries) => {
        res.status(200).json(entries)
    })
    .catch(err => {
        res.status(500).json({
            message: 'An error occurred',
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    const journal = new Journal({
        content: req.body.content
    })

    journal.save()
        .then(createdJournal => {
            res.status(201).json({
                message: 'Journal was added successfully',
                journal: createdJournal
            }) 
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            })
        })
})

router.put('/:id', (req, res, next) => {
    let id = req.params.id
    let o_id = new ObjectId(id)
    Journal.findById(id)
      .then(journal => {
          console.log(journal)
        journal.content = req.body.content;
        
        Journal.updateOne({ _id: o_id }, journal)
          .then(result => {
            res.status(204).json({
              message: 'Journal updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Journal not found.',
          error: { journal: 'Journal not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    let id = req.params.id
    let o_id = new ObjectId(id)
    Journal.findById(id)
      .then(journal => {
        Journal.deleteOne({ _id: o_id})
          .then(result => {
            res.status(204).json({
              message: "Journal deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Journal not found.',
          error: { journal: 'Journal not found'}
        });
      });
});

 module.exports = router; 