package com.vzh.iherych.Repository;

import com.vzh.iherych.Model.Fact;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactRepository extends PagingAndSortingRepository<Fact, Long> {
}
