const searchQuery = `
query SearchQuery($searchTerm: String!){
  search(searchTerm: $searchTerm){
    departments{
      _id
      name
      responsible
    }

    vacations{
      _id
      worker{
        _id
        role
        name
        matriculation
        justification
        department{
          _id
          name
          responsible
        }
      }
      daysQtd
      type
      startDate
      endDate
      subType
      createdAt
      updatedAt
    }

    workers{
      _id
      name
      registry
      matriculation
      status
      role
      admissionDate
      justification
      department{
        _id
        name
        responsible
      }
    }
  }
}
`;

export { searchQuery };
