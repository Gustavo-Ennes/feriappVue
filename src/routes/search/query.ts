const searchQuery = `
query SearchQuery($searchTerm: String!){
  search(searchTerm: $searchTerm){
    departments{
      _id
      name
    }

    vacations{
      _id
      worker{
        _id
        role
        name
        matriculation
        department{
          _id
          name
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
      department{
        _id
        name
      }
    }
  }
}
`;

export { searchQuery };
